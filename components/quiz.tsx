"use client";
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveQuizResponse, getQuizResponse, resetQuizResponse } from '@/utils/indexedDB';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { buttonVariants } from '@/components/ui/button'

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
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <div className="flex items-center text-green-800 dark:text-green-300 mb-2">
              <svg className="mr-2" style={{width: '1rem', height: '1rem'}} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-sm">Correct</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 m-0">{explanation}</p>
          </div>
        );
      } else {
        return (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
            <div className="flex items-center text-amber-800 dark:text-amber-300 mb-2">
              <svg className="mr-2" style={{width: '1rem', height: '1rem'}} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-sm">Not Quite</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 m-0"><b>Hint:</b> {hint}</p>
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
    <div className="bg-gray-50 dark:bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-black shadow-lg rounded-lg overflow-hidden">
        <div className="text-center p-4">
          <div className="mx-auto flex items-center justify-center mb-4 overflow-hidden">
            <Image
              src="/wolfie-check.png"
              alt="Quiz topic"
              width={60}
              height={60}
              className="object-cover"
              style={{margin: '0em'}}
            />
          </div>
          <h4 className="font-normal" style={{marginTop: '0'}}>Time for a Quiz!</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Wolfie wants to test your knowledge.
          </p>
        </div>
        <div className="px-6 py-4">
          <div className="text-center mb-4">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white" style={{marginTop: '0'}}>{question}</h2>
          </div>
          <div className="space-y-3">
            {options.map((option, index) => (
              <div 
                key={uuidv4()}
                className={`flex items-center p-3 rounded-lg border transition-colors cursor-pointer ${
                  isAnswerChecked
                    ? option === selectedAnswer
                      ? isCorrect
                        ? 'border-avax-green bg-green-50 dark:bg-green-900/30 dark:border-green-700'
                        : 'border-avax-red bg-red-50 dark:bg-red-900/30 dark:border-red-700'
                      : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-black'
                    : selectedAnswer === option
                      ? 'border-[#3752ac] bg-[#3752ac] bg-opacity-10 dark:bg-opacity-30'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900'
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 text-sm ${
                  isAnswerChecked
                    ? option === selectedAnswer
                      ? isCorrect
                        ? 'bg-avax-green text-white'
                        : 'bg-avax-red text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    : selectedAnswer === option
                      ? 'bg-[#3752ac] text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{option}</span>
              </div>
            ))}
          </div>
          {renderAnswerFeedback()}
        </div>
        <div className="px-6 py-4 flex justify-center">
          {!isAnswerChecked ? (
            <button 
                className={cn(
                buttonVariants({ variant: 'default'}),
                )}
                onClick={checkAnswer}
                disabled={selectedAnswer === null}
            >
              Check Answer
            </button>
          ) : (
            !isCorrect && (
              <button
                className={cn(
                buttonVariants({ variant: 'secondary' }),
                )}
                onClick={handleTryAgain}
              >
                Try Again!
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;