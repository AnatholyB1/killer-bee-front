import React from 'react';
import { Button } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';

const EmptyComponent = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          No models found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/models/create')}
        >
          <Typography>Create Model</Typography>
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyComponent;