// components/CertificatePage.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { getQuizResponse } from '@/utils/indexedDB';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { getChapterUrlForQuiz, getAllQuizIds, getChaptersForCourse, getQuizzesForChapter } from '@/components/quiz/quizMap';
import Link from 'next/link';

interface CertificatePageProps {
  courseId: string;
}

const CertificatePage: React.FC<CertificatePageProps> = ({ courseId }) => {
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const allQuizIds = getAllQuizIds(courseId);
  const chapters = getChaptersForCourse(courseId);

  useEffect(() => {
    const checkQuizCompletion = async () => {
      const completed = await Promise.all(
        allQuizIds.map(async (quizId) => {
          const response = await getQuizResponse(quizId);
          return response && response.isCorrect ? quizId : null;
        })
      );
      setCompletedQuizzes(completed.filter((id): id is string => id !== null));
      setIsLoading(false);
    };

    checkQuizCompletion();
  }, [allQuizIds]);

  const allQuizzesCompleted = completedQuizzes.length === allQuizIds.length;

  const generateCertificate = async () => {
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          userName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate certificate');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${courseId}_certificate.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Failed to generate certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Course Completion Certificate</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Progress:</h2>
        {chapters.map((chapter) => (
          <div key={chapter} className="mb-4">
            <h3 className="text-lg font-medium mb-2">{chapter}</h3>
            <ul>
              {getQuizzesForChapter(courseId, chapter).map((quizId) => (
                <li key={quizId} className="flex items-center mb-2">
                  <span className={`w-4 h-4 mr-2 rounded-full ${completedQuizzes.includes(quizId) ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {completedQuizzes.includes(quizId) ? (
                    <span>Quiz {quizId}: Completed</span>
                  ) : (
                    <Link href={getChapterUrlForQuiz(quizId)} className="text-blue-500 hover:underline">
                      Quiz {quizId}: Not completed - Click to go to quiz
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {allQuizzesCompleted && (
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enter your full name:
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="John Doe"
          />
        </div>
      )}
      <div className="text-center">
        <button
          className={cn(
            buttonVariants({ variant: allQuizzesCompleted ? 'default' : 'secondary' }),
            'w-full'
          )}
          onClick={generateCertificate}
          disabled={!allQuizzesCompleted || isGenerating}
        >
          {isGenerating
            ? 'Generating Certificate...'
            : allQuizzesCompleted
            ? 'Generate Certificate'
            : 'Complete All Quizzes to Unlock Certificate'}
        </button>
      </div>
    </div>
  );
};

export default CertificatePage;