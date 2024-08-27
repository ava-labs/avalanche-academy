"use client";
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveQuizResponse, getQuizResponse, resetQuizResponse } from '../utils/indexedDB';
import Image from 'next/image';

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
            <p className="text-sm text-gray-600">{explanation}</p>
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
            <p className="text-sm text-gray-600">Hint: {hint}</p>
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-center p-6">
          <div className="mx-auto bg-blue-400 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
            <Image
                src="/quiz.png"
                alt="Quiz Icon"
                layout="fill"
                objectFit="contain"
                style={{margin: '0em'}}
            />
          </div>
          <h1 className="text-xl font-medium text-gray-700">It's time to take a quiz!</h1>
          <p className="text-sm text-gray-500 mt-1">
            Test your knowledge and see what you've just learned.
          </p>
        </div>
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-lg font-medium text-gray-800">{question}</h2>
          </div>
          <div className="space-y-3">
            {options.map((option) => (
              <label 
                key={uuidv4()}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors cursor-pointer ${
                  isAnswerChecked
                    ? option === correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : option === selectedAnswer
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-white'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="quiz-option"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleAnswerSelect(option)}
                  disabled={isAnswerChecked}
                  className="form-radio text-gray-800 focus:ring-2 focus:ring-gray-800"
                />
                <span className="text-sm text-gray-600">{option}</span>
              </label>
            ))}
          </div>
          {renderAnswerFeedback()}
        </div>
        <div className="px-6 py-4 bg-gray-50 flex justify-center">
          {!isAnswerChecked ? (
            <button 
              className="px-8 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-colors"
              onClick={checkAnswer}
              disabled={selectedAnswer === null}
            >
              Check Answer
            </button>
          ) : (
            !isCorrect && (
              <button 
                className="px-8 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-colors"
                onClick={handleTryAgain}
              >
                Try Again
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;