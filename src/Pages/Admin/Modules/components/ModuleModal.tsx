import React, { useState, useEffect } from 'react';
import { Module, Lesson } from '../index';

interface Course {
  id: number;
  title: string;
}

interface ModuleModalProps {
  module: Module | null;
  onClose: () => void;
  onSave: (module: Module) => void;
  courses: Course[];
}

const defaultModule: Omit<Module, 'id'> = {
  courseId: 0,
  title: '',
  description: '',
  lessons: []
};

const ModuleModal: React.FC<ModuleModalProps> = ({ 
  module, 
  onClose, 
  onSave, 
  courses 
}) => {
  const [formData, setFormData] = useState<Module>(
    module || { 
      ...defaultModule, 
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Module, string>>>({});
  const [lessons, setLessons] = useState<Lesson[]>(module?.lessons || []);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof Module, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título do módulo é obrigatório';
    }

    if (!formData.courseId) {
      newErrors.courseId = 'Selecione um curso';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const updatedModule: Module = {
        ...formData,
        lessons,
        updatedAt: new Date().toISOString()
      };

      onSave(updatedModule);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'courseId' ? Number(value) : value
    }));
    
    // Limpar erro do campo quando ele for alterado
    if (errors[name as keyof Module]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const addLesson = () => {
    const newLesson: Lesson = {
      id: Date.now(),
      title: `Nova Aula ${lessons.length + 1}`,
      videoUrl: '',
      duration: '00:00',
      completed: false
    };
    setLessons([...lessons, newLesson]);
  };

  const updateLesson = (updatedLesson: Lesson) => {
    setLessons(prevLessons => 
      prevLessons.map(lesson => 
        lesson.id === updatedLesson.id ? updatedLesson : lesson
      )
    );
  };

  const removeLesson = (lessonId: number) => {
    setLessons(prevLessons => 
      prevLessons.filter(lesson => lesson.id !== lessonId)
    );
  };

  return (
    <div className="modal-overlay">
      <div className="module-modal">
        <header className="modal-header">
          <h2>{module ? 'Editar Módulo' : 'Novo Módulo'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título do Módulo</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
              placeholder="Digite o título do módulo"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição (Opcional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Descrição do módulo"
              rows={3}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="courseId">Curso</label>
            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              className={errors.courseId ? 'error' : ''}
            >
              <option value="0">Selecione um curso</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
            {errors.courseId && <span className="error-message">{errors.courseId}</span>}
          </div>

          <div className="lessons-section">
            <div className="lessons-header">
              <h3>Aulas do Módulo</h3>
              <button 
                type="button" 
                className="btn-add-lesson"
                onClick={addLesson}
              >
                + Adicionar Aula
              </button>
            </div>

            {lessons.length === 0 ? (
              <div className="no-lessons">
                Nenhuma aula adicionada ainda
              </div>
            ) : (
              <div className="lessons-list">
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className="lesson-item">
                    <div className="lesson-details">
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={(e) => updateLesson({
                          ...lesson,
                          title: e.target.value
                        })}
                        placeholder={`Nome da Aula ${index + 1}`}
                      />
                      <input
                        type="text"
                        value={lesson.duration}
                        onChange={(e) => updateLesson({
                          ...lesson,
                          duration: e.target.value
                        })}
                        placeholder="Duração (ex: 10:30)"
                      />
                      <input
                        type="text"
                        value={lesson.videoUrl}
                        onChange={(e) => updateLesson({
                          ...lesson,
                          videoUrl: e.target.value
                        })}
                        placeholder="URL do Vídeo"
                      />
                    </div>
                    <button 
                      type="button"
                      className="btn-remove-lesson"
                      onClick={() => removeLesson(lesson.id)}
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-primary"
            >
              {module ? 'Salvar Alterações' : 'Criar Módulo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModuleModal;