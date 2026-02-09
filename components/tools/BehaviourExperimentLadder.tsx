import React, { useState } from 'react';
import { useTools } from '@/context/ToolContext';
import Button from '@/components/ui/Button';
import cn from '@/lib/cn';

const STEPS = [
    { id: 1, label: '現狀觀察', icon: '🔍' },
    { id: 2, label: '假設建立', icon: '🧠' },
    { id: 3, label: '階梯規劃', icon: '🪜' },
    { id: 4, label: '預期結果', icon: '✨' },
];

export const BehaviourExperimentLadder: React.FC = () => {
    const { saveToolResult } = useTools();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        observation: '',
        hypothesis: '',
        steps: ['', '', ''],
        outcome: '',
    });

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1);
        } else {
            saveToolResult('behaviour-experiment-ladder', formData);
            alert('實驗計畫已儲存！您可以在聯絡表單中查看相關建議。');
        }
    };

    const handlePrev = () => setCurrentStep(Math.max(1, currentStep - 1));

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
            <div className="mb-8 flex justify-between">
                {STEPS.map((step) => (
                    <div key={step.id} className="flex flex-col items-center gap-2">
                        <div className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all",
                            currentStep >= step.id ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" : "bg-slate-100 text-slate-400"
                        )}>
                            {step.id}
                        </div>
                        <span className={cn("text-xs font-bold", currentStep >= step.id ? "text-slate-900" : "text-slate-400")}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="min-h-[300px] space-y-6">
                {currentStep === 1 && (
                    <div className="space-y-4 animate-fade-in">
                        <h2 className="text-xl font-bold text-slate-900">1. 目前的障礙觀測</h2>
                        <p className="text-sm text-slate-500">當您想到要採取的行動時，腦中出現了什麼樣的自動化想法或恐懼？</p>
                        <textarea
                            className="w-full rounded-2xl border-slate-200 p-4 focus:ring-emerald-500 min-h-[120px]"
                            placeholder="例：我覺得如果我主動聯絡對方，對方一定會覺得我很煩..."
                            value={formData.observation}
                            onChange={(e) => updateField('observation', e.target.value)}
                        />
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                        <h2 className="text-xl font-bold text-slate-900">2. 實驗假設</h2>
                        <p className="text-sm text-slate-500">如果我們做一個相反的小實驗，您預測會發生什麼？（具體且可驗證）</p>
                        <textarea
                            className="w-full rounded-2xl border-slate-200 p-4 focus:ring-emerald-500 min-h-[120px]"
                            placeholder="例：如果我發出這封簡短的問候信，有 50% 的機率對方會在 3 天內回覆我的問題。"
                            value={formData.hypothesis}
                            onChange={(e) => updateField('hypothesis', e.target.value)}
                        />
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-4 animate-fade-in">
                        <h2 className="text-xl font-bold text-slate-900">3. 階梯規劃</h2>
                        <p className="text-sm text-slate-500">將大行動拆解成三個微型實驗，從最容易的開始：</p>
                        {formData.steps.map((step, i) => (
                            <div key={i} className="flex gap-4 items-center">
                                <span className="text-lg font-bold text-emerald-500">#{i + 1}</span>
                                <input
                                    className="flex-1 rounded-xl border-slate-200 p-3"
                                    placeholder={`實驗步驟 ${i + 1}`}
                                    value={step}
                                    onChange={(e) => {
                                        const newSteps = [...formData.steps];
                                        newSteps[i] = e.target.value;
                                        updateField('steps', newSteps);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="space-y-4 animate-fade-in">
                        <h2 className="text-xl font-bold text-slate-900">4. 預期學習</h2>
                        <p className="text-sm text-slate-500">不論結果好壞，您希望透過這個實驗學到什麼？</p>
                        <textarea
                            className="w-full rounded-2xl border-slate-200 p-4 focus:ring-emerald-500 min-h-[120px]"
                            placeholder="例：我想確認『被拒絕』是否真的如我想像中那樣具備毀滅性。"
                            value={formData.outcome}
                            onChange={(e) => updateField('outcome', e.target.value)}
                        />
                    </div>
                )}
            </div>

            <div className="mt-10 flex justify-between gap-4">
                <Button
                    variant="secondary"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className="w-32"
                >
                    上一步
                </Button>
                <Button
                    variant="primary"
                    onClick={handleNext}
                    className="flex-1 bg-emerald-500"
                >
                    {currentStep === STEPS.length ? '儲存並完成' : '下一步'}
                </Button>
            </div>
        </div>
    );
};
