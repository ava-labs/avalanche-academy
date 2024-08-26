"use client";
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveQuizResponse, getQuizResponse, resetQuizResponse } from '../utils/indexedDB';

interface QuizProps {
  quizId: string;
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}

const Quiz: React.FC<QuizProps> = ({ quizId, question, options, correctAnswer, hint, explanation }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    loadSavedResponse();
  }, [quizId]);

  const loadSavedResponse = async () => {
    const savedResponse = await getQuizResponse(quizId);
    if (savedResponse) {
      setSelectedAnswer(savedResponse.selectedAnswer);
      setIsAnswerChecked(savedResponse.isAnswerChecked);
      setIsCorrect(savedResponse.isCorrect);
    } else {
      resetQuizState();
    }
  };

  const resetQuizState = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswerChecked) {
      setSelectedAnswer(answer);
    }
  };

  const checkAnswer = async () => {
    if (selectedAnswer !== null) {
      const correct = selectedAnswer === correctAnswer;
      setIsCorrect(correct);
      setIsAnswerChecked(true);
      
      await saveQuizResponse(quizId, {
        selectedAnswer,
        isAnswerChecked: true,
        isCorrect: correct,
      });
    }
  };

  const handleTryAgain = async () => {
    await resetQuizResponse(quizId);
    resetQuizState();
  };

  const renderAnswerFeedback = () => {
    if (isAnswerChecked) {
      if (isCorrect) {
        return (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center text-green-800 mb-2">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Correct</span>
            </div>
            <p className="text-gray-600">{explanation}</p>
          </div>
        );
      } else {
        return (
          <div className="mt-4 p-4 bg-amber-50 rounded-lg">
            <div className="flex items-center text-amber-800 mb-2">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Not Quite</span>
            </div>
            <p className="text-gray-600">Hint: {hint}</p>
          </div>
        );
      }
    }
    return null;
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto my-8">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-blue-500 rounded-full p-4">
          <span className="text-white text-2xl font-bold">?</span>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center mb-4">It's time to take a quiz!</h2>
      <p className="text-center mb-6 text-gray-600">Test your knowledge and see what you've just learned.</p>
      
      <h3 className="text-xl font-semibold mb-4">{question}</h3>
      
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={uuidv4()}
            onClick={() => handleAnswerSelect(option)}
            className={`w-full text-left p-3 rounded-lg border ${
              selectedAnswer === option
                ? isAnswerChecked
                  ? isCorrect
                    ? 'bg-green-100 border-green-500'
                    : 'bg-red-100 border-red-500'
                  : 'bg-blue-100 border-blue-500'
                : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
            }`}
            disabled={isAnswerChecked}
          >
            <span className="inline-block w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-center mr-2">
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </button>
        ))}
      </div>
      
      {renderAnswerFeedback()}
      
      <div className="mt-6">
        {!isAnswerChecked ? (
          <button
            onClick={checkAnswer}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={selectedAnswer === null}
          >
            Check Answer
          </button>
        ) : (
          !isCorrect && (
            <button
              onClick={handleTryAgain}
              className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Try Again
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Quiz;