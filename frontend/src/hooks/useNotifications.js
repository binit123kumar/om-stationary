import React, { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '../session.js';
export function useNotifications(user){
  const [state,setState]=useState({unread:0,items:[]});
  const load=useCallback(async()=>{
    if(user?.role!=='Customer'){setState({unread:0,items:[]});return}
    try{
      const r=await apiFetch('/api/notifications?take=30');
      if(!r.ok)return;
      setState(await r.json());
    }catch{}
  },[user?.id,user?.role]);
  useEffect(()=>{load()},[load]);
  useEffect(()=>{
    if(user?.role!=='Customer')return;
    const timer=setInterval(load,15000);
    return()=>clearInterval(timer);
  },[load,user?.role]);
  return {...state,refresh:load};
}
