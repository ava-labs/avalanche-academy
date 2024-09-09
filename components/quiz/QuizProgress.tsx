"use client";
import React, { useState, useEffect } from 'react';
import { getQuizProgress, isEligibleForCertificate } from '@/utils/quizProgress';

interface QuizProgressProps {
  quizIds: string[];
}

const QuizProgress: React.FC<QuizProgressProps> = ({ quizIds }) => {
  const [progress, setProgress] = useState<{ [quizId: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      const quizProgress = await getQuizProgress(quizIds);
      setProgress(quizProgress);
      setIsLoading(false);
    }
    loadProgress();
  }, [quizIds]);

  if (isLoading) {
    return <div>Loading progress...</div>;
  }

  const eligibleForCertificate = isEligibleForCertificate(progress);

  return (
    <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Quiz Progress</h2>
      <ul className="mb-4">
        {quizIds.map((quizId) => (
          <li key={quizId} className="flex items-center mb-2">
            <span className={`w-4 h-4 rounded-full mr-2 ${progress[quizId] ? 'bg-green-500' : 'bg-red-500'}`}></span>
            Quiz {quizId}: {progress[quizId] ? 'Completed' : 'Not completed'}
          </li>
        ))}
      </ul>
      {eligibleForCertificate ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p className="font-bold">Congratulations!</p>
          <p>You're eligible for a certificate. Click here to claim it.</p>
        </div>
      ) : (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">Keep going!</p>
          <p>Complete more quizzes to earn your certificate.</p>
        </div>
      )}
    </div>
  );
};

export default QuizProgress;