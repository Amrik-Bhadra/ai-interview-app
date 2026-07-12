import { useState, useEffect } from 'react';
import { getDashboard } from '../../interview/services/interview.api';

export const useDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await getDashboard();
                if (!cancelled) setData(res.dashboard);
            } catch (err) {
                if (!cancelled) setError(err?.response?.data?.message ?? 'Failed to load dashboard.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, []);

    return { data, loading, error };
};