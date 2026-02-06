import React, { createContext, useContext, useState, useEffect } from 'react';

type ToolResult = {
    slug: string;
    timestamp: string;
    data: any;
};

type ToolContextType = {
    usedTools: Record<string, ToolResult>;
    saveToolResult: (slug: string, data: any) => void;
    hasUsedTool: (slug: string) => boolean;
};

const ToolContext = createContext<ToolContextType | undefined>(undefined);

export const ToolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usedTools, setUsedTools] = useState<Record<string, ToolResult>>({});

    useEffect(() => {
        const stored = sessionStorage.getItem('ssg_tool_usage');
        if (stored) {
            try {
                setUsedTools(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse tool usage from session', e);
            }
        }
    }, []);

    const saveToolResult = (slug: string, data: any) => {
        const newUsage = {
            ...usedTools,
            [slug]: {
                slug,
                timestamp: new Date().toISOString(),
                data,
            },
        };
        setUsedTools(newUsage);
        sessionStorage.setItem('ssg_tool_usage', JSON.stringify(newUsage));
    };

    const hasUsedTool = (slug: string) => !!usedTools[slug];

    return (
        <ToolContext.Provider value={{ usedTools, saveToolResult, hasUsedTool }}>
            {children}
        </ToolContext.Provider>
    );
};

export const useTools = () => {
    const context = useContext(ToolContext);
    if (context === undefined) {
        throw new Error('useTools must be used within a ToolProvider');
    }
    return context;
};
