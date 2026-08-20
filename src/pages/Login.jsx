import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { ErrorAlert } from '../components/ErrorAlert';

// Definición del esquema de validación con Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Debe ser un correo electrónico válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiamos el error específico al escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Usamos safeParse que es más seguro y no lanza excepciones
    const result = loginSchema.safeParse(formData);
    
    if (!result.success) {
      const formErrors = {};
      result.error.errors.forEach((error) => {
        formErrors[error.path[0]] = error.message;
      });
      setErrors(formErrors);
      return;
    }

    // Si pasa la validación, simulamos login
    login();
    navigate('/control-center');
  };

  return (
    <div className="dashboard-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="mission-panel" style={{ width: '350px', textAlign: 'center' }}>
        <h2>Acceso Restringido</h2>
        <p>Identificación requerida para el Centro de Control.</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem', textAlign: 'left' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Correo Electrónico</label>
            <input 
              type="text" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', boxSizing: 'border-box' }}
            />
            {errors.email && <div style={{ color: '#ff7b72', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.email}</div>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Contraseña</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', boxSizing: 'border-box' }}
            />
            {errors.password && <div style={{ color: '#ff7b72', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.password}</div>}
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', cursor: 'pointer', border: 'none' }}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
