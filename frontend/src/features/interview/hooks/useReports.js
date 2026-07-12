import { useState, useEffect, useCallback } from 'react';
import { getAllReports } from '../services/interview.api';

export const useReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await getAllReports();
                if (!cancelled) setReports(data.reports ?? []);
            } catch (err) {
                if (!cancelled) setError(err?.response?.data?.message ?? 'Failed to load reports.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();

        return () => { cancelled = true; };
    }, []);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getAllReports();
            setReports(data.reports ?? []);
        } catch (err) {
            setError(err?.response?.data?.message ?? 'Failed to load reports.');
        } finally {
            setLoading(false);
        }
    }, []);

    return { reports, loading, error, refetch };
};