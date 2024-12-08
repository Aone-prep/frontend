import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Grid, 
  Paper, 
  TextField
} from '@mui/material';

const QuestionRenderer = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect 
}) => {
  const isMultipleChoice = question.type === 'multiple-choice';

  return (
    <Card elevation={3} className="w-full mb-6">
      <CardContent>
        <Typography variant="h6" className="mb-4">
          {question.text}
        </Typography>

        {isMultipleChoice ? (
          <RadioGroup 
            value={selectedAnswer || ''} 
            onChange={(e) => onAnswerSelect(e.target.value)}
          >
            <Grid container spacing={2}>
              {question.options.map((option, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper 
                    elevation={1} 
                    className={`p-3 ${
                      selectedAnswer === option.value 
                        ? 'bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <FormControlLabel
                      value={option.value}
                      control={<Radio />}
                      label={option.text}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        ) : (
          <TextField
            fullWidth
            variant="outlined"
            value={selectedAnswer || ''}
            onChange={(e) => onAnswerSelect(e.target.value)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionRenderer;