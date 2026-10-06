import { useEffect, useState } from 'react';
import { api } from '../utils/config.js';
export function usePickupLocation(){
  const [location,setLocation]=useState(null);
  useEffect(()=>{
    let active=true;
    fetch(api+'/api/locations/om-stationary')
      .then(r=>r.ok?r.json():Promise.reject())
      .then(d=>{if(active)setLocation(d)})
      .catch(()=>{if(active)setLocation(null)});
    return()=>{active=false};
  },[]);
  return location;
}
