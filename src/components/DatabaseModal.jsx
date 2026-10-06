import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  CircularProgress,
  IconButton
} from '@mui/material';
import { 
  Database, 
  Save, 
  FolderOpen, 
  Trash2, 
  X, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw 
} from 'lucide-react';

export default function DatabaseModal({ open, onClose, resumeData, setResumeData }) {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveTitle, setSaveTitle] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);
  const [dbHealth, setDbHealth] = useState(null);

  // Fetch list of resumes and database health
  const fetchResumes = async () => {
    setLoading(true);
    setStatusMsg(null);
    try {
      // Check health
      const healthRes = await fetch('/api/health');
      const healthData = await healthRes.json();
      setDbHealth(healthData);

      // Get resumes
      const res = await fetch('/api/resumes');
      if (res.ok) {
        const data = await res.json();
        setResumes(data);
      }
    } catch (err) {
      console.error('DB fetch error:', err);
      setDbHealth({ status: 'error', error: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setSaveTitle(resumeData.personalInfo?.fullName ? `${resumeData.personalInfo.fullName}'s Resume` : 'My Resume');
      fetchResumes();
    }
  }, [open, resumeData]);

  // Save / Upsert to PostgreSQL
  const handleSaveToDB = async () => {
    if (!saveTitle.trim()) return;
    setLoading(true);
    setStatusMsg(null);

    const resumeId = resumeData.id || `resume_${Date.now()}`;

    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: resumeId,
          title: saveTitle,
          data: { ...resumeData, id: resumeId }
        })
      });

      if (res.ok) {
        setStatusMsg({ type: 'success', text: 'Resume saved to PostgreSQL database successfully!' });
        fetchResumes();
      } else {
        const errData = await res.json();
        setStatusMsg({ type: 'error', text: errData.error || 'Failed to save to database' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: `Network / Server error: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  // Load resume by ID
  const handleLoadResume = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/resumes/${id}`);
      if (res.ok) {
        const record = await res.json();
        setResumeData(record.data);
        setStatusMsg({ type: 'success', text: `Loaded "${record.title}" into editor!` });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Error loading resume from DB' });
    } finally {
      setLoading(false);
    }
  };

  // Delete resume
  const handleDeleteResume = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this resume from PostgreSQL?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchResumes();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#ffffff',
          color: '#0f172a',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <DialogTitle className="flex justify-between items-center border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-600" />
          <span className="text-base font-bold text-slate-900">PostgreSQL Cloud Sync</span>
        </div>
        <IconButton onClick={onClose} size="small" sx={{ color: '#64748b' }}>
          <X className="w-4 h-4" />
        </IconButton>
      </DialogTitle>

      <DialogContent className="space-y-4 pt-4">
        {/* Database Health Badge */}
        <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${dbHealth?.database === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            <span className="font-semibold text-slate-700">
              PostgreSQL Status: {dbHealth?.database === 'connected' ? 'Connected' : 'Offline / Checking...'}
            </span>
          </div>
          <IconButton size="small" onClick={fetchResumes} sx={{ color: '#64748b' }} title="Refresh">
            <RefreshCw className="w-3.5 h-3.5" />
          </IconButton>
        </div>

        {/* Status Alert */}
        {statusMsg && (
          <div className={`p-2.5 rounded text-xs flex items-center gap-2 ${statusMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
            {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Save Current Resume */}
        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Save Active Resume</h4>
          <div className="flex gap-2">
            <TextField
              size="small"
              fullWidth
              label="Resume Name"
              value={saveTitle}
              onChange={(e) => setSaveTitle(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#0f172a',
                  backgroundColor: '#ffffff',
                  fontSize: '0.85rem',
                  borderRadius: '8px',
                  '& fieldset': { borderColor: '#cbd5e1' }
                },
                '& .MuiInputLabel-root': { color: '#64748b' }
              }}
            />
            <Button
              variant="contained"
              onClick={handleSaveToDB}
              disabled={loading}
              startIcon={<Save className="w-4 h-4" />}
              sx={{
                backgroundColor: '#059669',
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px 0 rgba(5, 150, 105, 0.3)',
                '&:hover': { backgroundColor: '#047857' }
              }}
            >
              Save
            </Button>
          </div>
        </div>

        {/* Saved Resumes List */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Saved Resumes in Database</h4>
          {loading && <div className="text-center py-4"><CircularProgress size={24} sx={{ color: '#2563eb' }} /></div>}
          {!loading && resumes.length === 0 && (
            <p className="text-xs text-slate-500 py-3 text-center">No resumes saved in PostgreSQL yet.</p>
          )}
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {resumes.map(r => (
              <div
                key={r.id}
                onClick={() => handleLoadResume(r.id)}
                className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-sm cursor-pointer transition"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800">{r.title}</p>
                  <p className="text-[10px] text-slate-400">Updated: {new Date(r.updated_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="small" variant="text" sx={{ color: '#2563eb', textTransform: 'none', fontSize: '0.75rem' }}>
                    Load
                  </Button>
                  <IconButton size="small" onClick={(e) => handleDeleteResume(r.id, e)} sx={{ color: '#e11d48' }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>

      <DialogActions className="border-t border-slate-100 px-4 py-2.5">
        <Button onClick={onClose} sx={{ color: '#64748b', textTransform: 'none' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
