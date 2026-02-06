import type { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

interface ToolShellProps {
    title: string;
    description: string;
    category: string;
    children: ReactNode;
}

export default function ToolShell({ title, description, category, children }: ToolShellProps) {
    const { t } = useTranslation('tools');

    return (
        <div className="mx-auto max-w-4xl px-4 py-8">
            <div className="mb-10 text-center">
                <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                    {category}
                </span>
                <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h1>
                <p className="mt-4 text-lg text-slate-600">{description}</p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl sm:p-10">
                {children}
            </div>

            <div className="mt-12 rounded-2xl bg-slate-50 p-6 text-center">
                <h3 className="text-lg font-semibold text-slate-900">
                    Want to discuss these results with a coach?
                </h3>
                <p className="mt-2 text-slate-600">
                    Your data is saved locally. You can attach it to your message when booking a chat.
                </p>
                <div className="mt-6">
                    <Link
                        href="/contact?from_tool=true"
                        className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-600"
                    >
                        Book a 20-minute chat
                    </Link>
                </div>
            </div>
        </div>
    );
}
