import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Chip 
} from '@mui/material';
import { motion } from 'framer-motion';

const QuestionRenderer = ({
  question,
  totalQuestions,
  currentQuestionIndex,
  selectedAnswer,
  onAnswerSelect
}) => {
  if (!question) return null;

  const getOptionColor = (optionId) => {
    if (selectedAnswer === optionId) {
      return 'primary';
    }
    return 'default';
  };

  const renderOptions = () => {
    const options = [
      { id: 'A', value: question.optionA },
      { id: 'B', value: question.optionB },
      { id: 'C', value: question.optionC },
      { id: 'D', value: question.optionD }
    ];

    return options.map((option) => (
      <motion.div
        key={option.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ width: '100%' }}
      >
        <Button
          variant={selectedAnswer === option.id ? 'contained' : 'outlined'}
          color={getOptionColor(option.id)}
          onClick={() => onAnswerSelect(option.id)}
          fullWidth
          sx={{
            justifyContent: 'flex-start', 
            my: 1, 
            py: 1.5,
            textTransform: 'none',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: selectedAnswer === option.id 
                ? undefined 
                : 'rgba(0,0,0,0.05)'
            }
          }}
        >
          {option.value}
        </Button>
      </motion.div>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: 3, 
          mb: 2 
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2 
          }}
        >
          <Chip 
            label={`Question ${currentQuestionIndex + 1}/${totalQuestions}`} 
            color="primary" 
            variant="outlined" 
          />
        </Box>

        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ fontWeight: 600, mb: 3 }}
        >
          {question.description}
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2 
          }}
        >
          {renderOptions()}
        </Box>
      </Paper>
    </motion.div>
  );
};

export default QuestionRenderer;