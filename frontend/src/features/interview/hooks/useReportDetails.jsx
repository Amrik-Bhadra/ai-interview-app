import { useState, useEffect } from 'react';
import { getReportById } from '../services/interview.api';

export const useReportDetails = (id) => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await getReportById(id);
                if (!cancelled) setReport(data.reportData);
            } catch (err) {
                if (!cancelled) setError(err?.response?.data?.message ?? 'Failed to load report.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, [id]);

    return { report, loading, error };
};