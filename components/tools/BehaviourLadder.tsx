import { useState, useEffect } from 'react';

export default function BehaviourLadder() {
    const [challenge, setChallenge] = useState('');
    const [steps, setSteps] = useState([{ id: 1, action: '', risk: 10 }]);

    // Auto-save to localStorage to link with Contact Form
    useEffect(() => {
        const toolResults = {
            tool: 'Behaviour Experiment Ladder',
            challenge,
            steps: steps.filter(s => s.action.trim() !== ''),
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem('ss_tool_results', JSON.stringify(toolResults));
    }, [challenge, steps]);

    const addStep = () => {
        if (steps.length < 5) {
            setSteps([...steps, { id: Date.now(), action: '', risk: 50 }]);
        }
    };

    const updateStep = (id: number, field: string, value: string | number) => {
        setSteps(steps.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const removeStep = (id: number) => {
        setSteps(steps.filter(s => s.id !== id));
    };

    return (
        <div className="space-y-8">
            <section className="space-y-3">
                <label className="block text-lg font-semibold text-slate-800">
                    1. What is the action you are avoiding or finding difficult?
                </label>
                <textarea
                    className="w-full rounded-xl border border-slate-200 p-4 focus:ring-2 focus:ring-emerald-500"
                    rows={3}
                    placeholder="e.g., Speaking up in the weekly team meeting..."
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                />
            </section>

            <section className="space-y-6">
                <label className="block text-lg font-semibold text-slate-800">
                    2. Break it down into smaller rungs
                </label>
                <div className="space-y-4">
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative rounded-2xl border border-slate-100 bg-slate-50 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-emerald-700">Rung {index + 1}</span>
                                {steps.length > 1 && (
                                    <button
                                        onClick={() => removeStep(step.id)}
                                        className="text-slate-400 hover:text-red-500"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <input
                                className="w-full rounded-lg border border-slate-200 p-3 mb-4"
                                placeholder="Describe the mini-experiment..."
                                value={step.action}
                                onChange={(e) => updateStep(step.id, 'action', e.target.value)}
                            />
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium text-slate-500">
                                    <span>Lower anxiety</span>
                                    <span>Higher anxiety</span>
                                </div>
                                <input
                                    type="range"
                                    className="w-full accent-emerald-600"
                                    min="0"
                                    max="100"
                                    value={step.risk}
                                    onChange={(e) => updateStep(step.id, 'risk', parseInt(e.target.value))}
                                />
                                <div className="text-center text-sm font-bold text-emerald-800">
                                    Perceived risk: {step.risk}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {steps.length < 5 && (
                    <button
                        onClick={addStep}
                        className="w-full rounded-xl border-2 border-dashed border-emerald-200 py-4 text-center text-emerald-700 transition hover:bg-emerald-50 hover:border-emerald-300"
                    >
                        + Add another rung
                    </button>
                )}
            </section>

            <div className="pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500 italic">
                    Tip: Start with a rung that feels like a 20-30% risk. The goal is to gather data, not to "win".
                </p>
            </div>
        </div>
    );
}
