"use client";
import React, { useState, useEffect } from 'react';
import { getQuizResponse } from '@/utils/indexedDB';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import quizDataImport from '@/components/quizzes/quizData.json';
import Quiz from '@/components/quizzes/quiz';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';

interface CertificatePageProps {
  courseId: string;
}

interface QuizInfo {
  id: string;
  chapter: string;
}

interface QuizData {
  question: string;
  options: string[];
  correctAnswers: number[];
  hint: string;
  explanation: string;
  chapter: string;
}

interface Course {
  title: string;
  quizzes: string[];
}

interface QuizDataStructure {
  courses: {
    [courseId: string]: Course;
  };
  quizzes: {
    [quizId: string]: QuizData;
  };
}

const quizData = quizDataImport as QuizDataStructure;

const CertificatePage: React.FC<CertificatePageProps> = ({ courseId }) => {
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizInfo[]>([]);

  useEffect(() => {
    const fetchQuizzes = () => {
      const courseQuizzes = quizData.courses[courseId]?.quizzes || [];
      const quizzesWithChapters = courseQuizzes.map(quizId => ({
        id: quizId,
        chapter: quizData.quizzes[quizId]?.chapter || 'Unknown Chapter'
      }));
      setQuizzes(quizzesWithChapters);
    };

    fetchQuizzes();
  }, [courseId]);

  useEffect(() => {
    const checkQuizCompletion = async () => {
      const completed = await Promise.all(
        quizzes.map(async (quiz) => {
          const response = await getQuizResponse(quiz.id);
          return response && response.isCorrect ? quiz.id : null;
        })
      );
      setCompletedQuizzes(completed.filter((id): id is string => id !== null));
      setIsLoading(false);
    };

    if (quizzes.length > 0) {
      checkQuizCompletion();
    }
  }, [quizzes]);

  const allQuizzesCompleted = completedQuizzes.length === quizzes.length;

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

  const chapters = [...new Set(quizzes.map(quiz => quiz.chapter))];

  const quizzesByChapter = chapters.reduce((acc, chapter) => {
    acc[chapter] = quizzes.filter(quiz => quiz.chapter === chapter);
    return acc;
  }, {} as Record<string, QuizInfo[]>);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {chapters.map((chapter) => {
        const chapterQuizzes = quizzesByChapter[chapter];
        const incompleteQuizzes = chapterQuizzes.filter(quiz => !completedQuizzes.includes(quiz.id));

        if (incompleteQuizzes.length === 0) return null;

        return (
          <div key={chapter} className="mb-8">
            <h3 className="text-xl font-medium mb-4">{chapter}</h3>
            <Accordions type="single" collapsible>
              {incompleteQuizzes.map((quiz) => (
                <Accordion key={quiz.id} title={`Quiz ${quiz.id}`}>
                  <Quiz quizId={quiz.id} />
                </Accordion>
              ))}
            </Accordions>
          </div>
        );
      })}
      {allQuizzesCompleted && (
        <div className="mt-8">
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
          <button
            className={cn(
              buttonVariants({ variant: 'default' }),
              'w-full'
            )}
            onClick={generateCertificate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating Certificate...' : 'Generate Certificate'}
          </button>
        </div>
      )}
      {!allQuizzesCompleted && (
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          Complete all quizzes to unlock your certificate!
        </div>
      )}
    </div>
  );
};

export default CertificatePage;