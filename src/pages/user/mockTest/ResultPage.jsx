import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  Grid, 
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { 
  CheckCircleOutline as PassIcon, 
  HighlightOff as FailIcon 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const ResultPage = ({ result }) => {
  const { 
    totalScore, 
    passMark, 
    fullMark, 
    passed, 
    detailedResults 
  } = result;

  // Calculate percentage
  const scorePercentage = Math.round((totalScore / fullMark) * 100);

  // Color and icon based on pass/fail
  const statusColor = passed ? 'success' : 'error';
  const StatusIcon = passed ? PassIcon : FailIcon;

  // Variant container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  // Item animation
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1 
    }
  };

  return (
    <Container maxWidth="md">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mt: 4, 
            borderRadius: 3,
            background: passed 
              ? 'linear-gradient(135deg, #e6f3ff, #c2e0ff)' 
              : 'linear-gradient(135deg, #fff0f0, #ffd1d1)'
          }}
        >
          <motion.div variants={itemVariants}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                mb: 3 
              }}
            >
              <StatusIcon 
                color={statusColor} 
                sx={{ fontSize: 80, mb: 2 }} 
              />
              <Typography 
                variant="h4" 
                color={statusColor} 
                gutterBottom
              >
                {passed ? 'Congratulations! You Passed' : 'Sorry, You Did Not Pass'}
              </Typography>
            </Box>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">Score</Typography>
                    <Typography variant="h4" color={statusColor}>
                      {totalScore} / {fullMark}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">Percentage</Typography>
                    <Typography variant="h4" color={statusColor}>
                      {scorePercentage}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">Pass Mark</Typography>
                    <Typography variant="h4" color={statusColor}>
                      {passMark} / {fullMark}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Detailed Performance
              </Typography>
              <Grid container spacing={2}>
                {detailedResults.map((question) => (
                  <Grid item xs={12} key={question.questionId}>
                    <Card 
                      variant="outlined"
                      sx={{ 
                        backgroundColor: question.isCorrect 
                          ? 'rgba(76, 175, 80, 0.1)' 
                          : 'rgba(244, 67, 54, 0.1)' 
                      }}
                    >
                      <CardContent>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center' 
                          }}
                        >
                          <Typography>
                            Question {question.questionId}
                          </Typography>
                          <Chip
                            label={question.isCorrect ? 'Correct' : 'Incorrect'}
                            color={question.isCorrect ? 'success' : 'error'}
                            size="small"
                          />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2">
                            Your Answer: {question.userAnswer}
                          </Typography>
                          <Typography variant="body2">
                            Correct Answer: {question.correctAnswer}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default ResultPage;