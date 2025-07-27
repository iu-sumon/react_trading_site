import React, { useEffect , useRef } from 'react';
import MyWorker from '../../workers/ws_worker_md';
import { useSelector , useDispatch } from 'react-redux';
import {  updateLtp , upodateBBO } from '../../slices/symbolsSlice'
import { updateTimeSales } from '../../slices/timeAndSalesSlicer';
import { updateIndex } from '../../slices/indexSlicer';

function WsFeedMd() {
    const workerRef = useRef(null);
    const dispatch = useDispatch();
   const initializedRef = useRef(false);
    useEffect(() => {
        if (initializedRef.current) return;
        // const worker = new MyWorker();
        initializedRef.current = true;
        workerRef.current = new Worker(new URL('../../workers/ws_worker_md', import.meta.url));

        // worker.postMessage(10);
        workerRef.current.postMessage(['init']);

        workerRef.current.onmessage = (e) => {
            // console.log(e);
            const { channel, msg } = e.data;
            // console.log('Received from worker:', channel, msg);
            if (channel === 'ltp') {
                dispatch(updateLtp(msg));
                dispatch(updateTimeSales(msg));
            } 
            else if (channel === 'bbo') {
                // console.log('BBO Update:', msg);
                // Dispatch the upodateBBO action with the received data
                // workerRef.current.postMessage({ type: 'upodateBBO', payload: msg });
                dispatch(upodateBBO(msg));
            }
            else if (channel === 'index') {
                // console.log('BBO Update:', msg);
                // Dispatch the upodateBBO action with the received data
                // workerRef.current.postMessage({ type: 'upodateBBO', payload: msg });
                dispatch(updateIndex(msg));
            }
        };
    }, [dispatch]);

    return null;
}

export default WsFeedMd;