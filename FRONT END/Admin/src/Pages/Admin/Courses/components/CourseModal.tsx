import React, { useState, useEffect } from 'react';
import { Course } from '../index';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onSave: (course: Course) => void;
}

const defaultCourse: Course = {
  id: 0,
  title: '',
  description: '',
  image: '',
  available: true
};

const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onSave }) => {
  const [formData, setFormData] = useState<Course>(course || defaultCourse);
  const [errors, setErrors] = useState<Partial<Record<keyof Course, string>>>({});

  useEffect(() => {
    setFormData(course || defaultCourse);
  }, [course]);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof Course, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSave({
        ...formData,
        id: formData.id || Date.now(),
        createdAt: formData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let processedValue = value;

    if (type === 'checkbox') {
      processedValue = (e.target as HTMLInputElement).checked.toString();
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Limpar erro do campo quando ele for alterado
    if (errors[name as keyof Course]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="course-modal">
        <header className="modal-header">
          <h2>{course ? 'Editar Curso' : 'Novo Curso'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
                onChange={handleChange}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
              rows={4}
            ></textarea>
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="image">Imagem do Curso</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {formData.image && (
              <div className="image-preview">
                <img src={formData.image} alt="Preview da imagem do curso" />
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="available">Status do Curso</label>
              <select
                id="available"
                name="available"
                value={formData.available.toString()}
                onChange={handleChange}
              >
                <option value="true">Disponível</option>
                <option value="false">Indisponível</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="instructor">Instrutor Principal</label>
              <select
                id="instructor"
                name="instructor"
                value={formData.instructors?.[0] || ''}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    instructors: [e.target.value]
                  }));
                }}
              >
                <option value="">Selecione um instrutor</option>
                <option value="Maria Silva">Maria Silva</option>
                <option value="João Santos">João Santos</option>
                <option value="Pedro Oliveira">Pedro Oliveira</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {course ? 'Salvar Alterações' : 'Criar Curso'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;