import React, { useState } from 'react'; // Adicionado useState
import { useParams, useNavigate } from 'react-router-dom';
import './Lesson.scss';

const mockData = {
  courseTitle: 'Criação de Conteúdo com IA',
  modules: [
    {
      id: '1',
      title: 'Módulo 1 - Introdução',
      lessons: [
        { id: 'a1', title: 'Boas-vindas e objetivos', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 'a2', title: 'O que você vai aprender', video: 'https://www.w3schools.com/html/movie.mp4' },
      ],
    },
    {
      id: '2',
      title: 'Módulo 2 - Prática com Ferramentas',
      lessons: [
        { id: 'a3', title: 'Usando o ChatGPT', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 'a4', title: 'Criando Imagens com IA', video: 'https://www.w3schools.com/html/movie.mp4' },
      ],
    },
  ],
};

const Lesson = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();

  // Estado para controlar qual módulo está aberto
  const [openModule, setOpenModule] = useState<number | null>(null);

  // Função para alternar o estado do módulo (abrir/fechar)
  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  const module = mockData.modules.find((m) => m.id === moduleId);
  const lesson = module?.lessons.find((l) => l.id === lessonId);

  if (!module || !lesson) return <div>Lição não encontrada.</div>;

  return (
    <div className="lesson-page">
      <div className="lesson-video">
        <video controls src={lesson.video} />
        <h2>{lesson.title}</h2>
        <div className="lesson-transcript">
          <h3>Transcrição</h3>
          <p>
            Olá e bem-vindo à aula! Neste vídeo, vamos explorar como a inteligência artificial pode ser usada para acelerar a criação de conteúdo. Você vai entender como estruturar ideias com o ChatGPT, gerar imagens com Midjourney, e transformar tudo isso em posts, vídeos e campanhas completas.
          </p>
          <p>
            Começamos com a introdução dos objetivos e, logo depois, mergulhamos nas ferramentas práticas. Não se preocupe se parecer muita coisa no início — a ideia é ir passo a passo, aplicando na prática o que você já sabe e testando o novo.
          </p>
        </div>
      </div>

      <aside className="lesson-sidebar">
        <h3>{mockData.courseTitle}</h3>
        {mockData.modules.map((mod, idx) => (
          <div className="module" key={mod.id}>
            {/* Botão para abrir/fechar o módulo */}
            <button
              className="module-toggle"
              onClick={() => toggleModule(idx)}
            >
              <strong>{mod.title}</strong>
              <span className={`arrow ${openModule === idx ? 'open' : ''}`}>
                ▾
              </span>
            </button>
            {/* Lista de aulas só aparece se o módulo estiver aberto */}
            {openModule === idx && (
              <ul>
                {mod.lessons.map((les) => (
                  <li
                    key={les.id}
                    className={les.id === lessonId ? 'active' : ''}
                    onClick={() => navigate(`/lesson/${courseId}/${mod.id}/${les.id}`)}
                  >
                    {les.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </aside>
    </div>
  );
};

export default Lesson;