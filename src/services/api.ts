// src/services/api.ts
import imgUrso from '../Assets/images/urso.jpg';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Simulação de API para desenvolvimento
export const api = {
  get: async (endpoint: string) => {
    // Simulação de delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verifica se o endpoint existe no mockResponses
    if (endpoint in mockResponses) {
      return mockResponses[endpoint];
    }
    
    // Tratamento para endpoints dinâmicos (ex: /courses/1)
    if (endpoint.startsWith('/courses/') && endpoint.split('/').length === 3) {
      const courseId = Number(endpoint.split('/')[2]);
      const course = mockResponses['/courses'].find((c: any) => c.id === courseId);
      if (course) {
        return {
          ...course,
          modules: mockModules.filter((m: any) => m.courseId === courseId)
        };
      }
    }
    
    throw new Error(`Endpoint não encontrado: ${endpoint}`);
  },

  post: async (endpoint: string, data: any) => {
    // Simulação de delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (endpoint === '/auth/login') {
      // Simulação de login
      return { 
        token: 'mock-jwt-token', 
        user: { name: 'Usuário Teste', email: data.email }
      };
    }
    
    if (endpoint === '/auth/register') {
      // Simulação de registro
      return { 
        token: 'mock-jwt-token', 
        user: { name: data.name, email: data.email }
      };
    }
    
    if (endpoint === '/lessons/progress') {
      // Simulação de atualização de progresso
      return { success: true };
    }
    
    throw new Error(`Endpoint não implementado: ${endpoint}`);
  }
};

// Dados mockados
const mockResponses: Record<string, any> = {
  '/courses': [
    {
      id: 1,
      title: 'Introdução à Criatividade com IA',
      description: 'Aprenda a desenvolver sua criatividade usando IA como ferramenta potencializadora.',
      image: imgUrso,
      available: true,
      progress: 30,
      totalLessons: 12,
      completedLessons: 4
    },
    {
      id: 2,
      title: 'Design Thinking Avançado',
      description: 'Metodologias avançadas de Design Thinking para projetos criativos.',
      image: imgUrso,
      available: false,
      progress: 0,
      totalLessons: 8,
      completedLessons: 0
    },
    {
      id: 3,
      title: 'Criatividade na Prática',
      description: 'Exercícios práticos para estimular sua criatividade diariamente.',
      image: imgUrso,
      available: true,
      progress: 75,
      totalLessons: 10,
      completedLessons: 7
    }
  ]
};

// Módulos mockados
const mockModules = [
  {
    id: 1,
    courseId: 1,
    title: 'Fundamentos da Criatividade',
    lessons: [
      {
        id: 101,
        title: 'O que é criatividade?',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: '10:25',
        completed: true,
      },
      {
        id: 102,
        title: 'Mitos sobre criatividade',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: '08:15',
        completed: true,
      },
      {
        id: 103,
        title: 'Como estimular sua criatividade',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: '12:30',
        completed: false,
      }
    ]
  },
  {
    id: 2,
    courseId: 1,
    title: 'Inteligência Artificial e Criatividade',
    lessons: [
      {
        id: 201,
        title: 'Introdução à IA para criativos',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: '15:10',
        completed: true,
      },
      {
        id: 202,
        title: 'Ferramentas de IA para brainstorming',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: '11:45',
        completed: true,
      }
    ]
  }
];