

import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';

export const AdsSection = () => {
  const [friooAd, setFriooAd] = useState({
    title: '',
    videolink: '',
    imagelink: '',
    status: false,
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Base_url}api/ads/66be3286eced785a43d63cd6`);
        setFriooAd(response.data);
        console.log("DAta of ads ==>",response.data)
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${Base_url}api/ads/66be3286eced785a43d63cd6/update`, friooAd);
      setFriooAd(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setFriooAd({ ...friooAd, [event.target.name]: event.target.value });
  };

  const handleStatusChange = (event) => {
    setFriooAd({ ...friooAd, status: event.target.checked });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Edit Ads Details </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Title"
          name="title"
          value={friooAd.title}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Video Link"
          name="videolink"
          value={friooAd.videolink}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Image Link"
          name="imagelink"
          value={friooAd.imagelink}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{display:"flex",alignItems:"center"}}>
        <Typography> Status </Typography>
        <input
          type="checkbox"
          name="status"
          checked={friooAd.status}
          onChange={handleStatusChange}
          style={{marginLeft:"10px"}}
        />
        </Box>
        
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          name="description"
          value={friooAd.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {loading ? 'Updating...' : 'Update Frioo Ad'}
        </Button>
      </Grid>
      {error && (
        <Grid item xs={12}>
          <Typography color="error">{error}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

