// src/data/mockData.ts

export const mockCourseDetails = {
    1: {
      id: 1,
      title: 'Introdução à Criatividade com IA',
      description: 'Aprenda a desenvolver sua criatividade usando IA como ferramenta potencializadora. Neste curso, você descobrirá como utilizar ferramentas de inteligência artificial para expandir seus horizontes criativos e produzir conteúdo inovador.',
      image: 'https://placehold.co/600x400/0f172a/white?text=Criatividade+com+IA',
      available: true,
      progress: 30,
      totalLessons: 12,
      completedLessons: 4,
      modules: [
        {
          id: 1,
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
              completed: false,
            }
          ]
        }
      ]
    },
    2: {
      id: 2,
      title: 'Design Thinking Avançado',
      description: 'Metodologias avançadas de Design Thinking para projetos criativos. Aprenda a aplicar técnicas de empatia, ideação e prototipagem rápida em projetos reais.',
      image: 'https://placehold.co/600x400/1e293b/white?text=Design+Thinking',
      available: false,
      progress: 0,
      totalLessons: 8,
      completedLessons: 0,
      modules: [
        {
          id: 3,
          title: 'Imersão e Empatia',
          lessons: [
            {
              id: 301,
              title: 'Pesquisa com usuários',
              videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
              duration: '14:30',
              completed: false,
            },
            {
              id: 302,
              title: 'Mapa de empatia',
              videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
              duration: '09:45',
              completed: false,
            }
          ]
        }
      ]
    },
    3: {
      id: 3,
      title: 'Criatividade na Prática',
      description: 'Exercícios práticos para estimular sua criatividade diariamente. Este curso é ideal para quem quer desenvolver uma rotina criativa e superar bloqueios.',
      image: 'https://placehold.co/600x400/0f172a/white?text=Criatividade+Prática',
      available: true,
      progress: 75,
      totalLessons: 10,
      completedLessons: 7,
      modules: [
        {
          id: 4,
          title: 'Exercícios Diários',
          lessons: [
            {
              id: 401,
              title: 'Brainstorming em 5 minutos',
              videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
              duration: '07:30',
              completed: true,
            },
            {
              id: 402,
              title: 'Técnicas de escrita livre',
              videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
              duration: '09:45',
              completed: true,
            }
          ]
        }
      ]
    }
  };
  
  export const mockCourses = [
    {
      id: 1,
      title: 'Introdução à Criatividade com IA',
      description: 'Aprenda a desenvolver sua criatividade usando IA como ferramenta potencializadora.',
      image: 'https://placehold.co/600x400/0f172a/white?text=Criatividade+com+IA',
      available: true,
    },
    {
      id: 2,
      title: 'Design Thinking Avançado',
      description: 'Metodologias avançadas de Design Thinking para projetos criativos.',
      image: 'https://placehold.co/600x400/1e293b/white?text=Design+Thinking',
      available: false,
    },
    {
      id: 3,
      title: 'Criatividade na Prática',
      description: 'Exercícios práticos para estimular sua criatividade diariamente.',
      image: 'https://placehold.co/600x400/0f172a/white?text=Criatividade+Prática',
      available: true,
    }
  ];