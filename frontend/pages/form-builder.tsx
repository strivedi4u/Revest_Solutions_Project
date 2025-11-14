import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  Paper,
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import StorageIcon from '@mui/icons-material/Storage';
import ClearIcon from '@mui/icons-material/Clear';
import { DynamicFormField } from '@/components/DynamicForm';
import { signupFormSchema, FormField } from '@/config/formSchema';

interface FormSubmission {
  id: string;
  timestamp: string;
  data: Record<string, string>;
}

export default function FormBuilderPage() {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Load submissions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('formSubmissions');
    if (saved) {
      setSubmissions(JSON.parse(saved));
    }
  }, []);

  // Save submissions to localStorage
  const saveToLocalStorage = (data: FormSubmission[]) => {
    localStorage.setItem('formSubmissions', JSON.stringify(data));
    setSubmissions(data);
  };

  const onSubmit = (formData: any) => {
    const submission: FormSubmission = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      data: formData,
    };

    const updated = [submission, ...submissions];
    saveToLocalStorage(updated);

    setSuccessMessage('✓ Form submitted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);

    reset();
  };

  const handleViewSubmission = (submission: FormSubmission) => {
    setSelectedSubmission(submission);
    setOpenDialog(true);
  };

  const handleDeleteSubmission = (id: string) => {
    const updated = submissions.filter(s => s.id !== id);
    saveToLocalStorage(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all submissions?')) {
      saveToLocalStorage([]);
    }
  };

  const getFieldLabelFromSchema = (fieldId: string): string => {
    const field = signupFormSchema.data.find(
      f => f.id === parseInt(fieldId.replace('field_', ''))
    );
    return field?.name || fieldId;
  };

  const formatFieldValue = (fieldId: string, value: string): string => {
    const field = signupFormSchema.data.find(
      f => f.id === parseInt(fieldId.replace('field_', ''))
    );

    if (field?.fieldType === 'LIST' || field?.fieldType === 'RADIO') {
      const index = parseInt(value) - 1;
      return field?.listOfValues1?.[index] || value;
    }

    return value;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          Sign Up Form
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Dynamic form builder with validation and data persistence
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Fill in Your Information
            </Typography>

            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              {signupFormSchema.data.map((field: FormField) => (
                <DynamicFormField
                  key={field.id}
                  field={field}
                  control={control}
                  errors={errors}
                />
              ))}

              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SendIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    flex: 1,
                  }}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={() => reset()}
                >
                  Reset
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>

        {/* Submissions Summary Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                <StorageIcon /> Saved Submissions ({submissions.length})
              </Typography>
              {submissions.length > 0 && (
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={handleClearAll}
                >
                  Clear All
                </Button>
              )}
            </Box>

            {submissions.length === 0 ? (
              <Card sx={{ backgroundColor: '#fff', border: '2px dashed #ccc' }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="textSecondary">
                    No submissions yet. Fill and submit the form to see data here.
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="right">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id} hover>
                        <TableCell>{submission.timestamp}</TableCell>
                        <TableCell>{submission.data.field_2}</TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => handleViewSubmission(submission)}
                            sx={{ mr: 1 }}
                          >
                            View
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteSubmission(submission.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* View Submission Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Submission Details</DialogTitle>
        <DialogContent>
          {selectedSubmission && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="caption" color="textSecondary" display="block" sx={{ mb: 2 }}>
                Submitted: {selectedSubmission.timestamp}
              </Typography>
              {Object.entries(selectedSubmission.data).map(([key, value]) => (
                <Box key={key} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                    {getFieldLabelFromSchema(key)}
                  </Typography>
                  <Typography variant="body2" sx={{ pl: 1 }}>
                    {formatFieldValue(key, value as string)}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
