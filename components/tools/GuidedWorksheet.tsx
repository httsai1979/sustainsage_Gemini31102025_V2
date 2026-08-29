import { useEffect, useMemo, useState } from 'react';
import { CheckCircle, ClipboardText, Printer, Trash } from '@phosphor-icons/react';
import type { ChangeLeadershipTool } from '@/content/changeLeadershipTools';

export default function GuidedWorksheet({ tool, locale }: { tool: Readonly<ChangeLeadershipTool>; locale: string }) {
  const zh = locale === 'zh-TW';
  const storageKey = `sustainsage-tool-${locale}-${tool.slug}`;
  const empty = useMemo(() => Object.fromEntries(tool.prompts.map((prompt) => [prompt.id, ''])), [tool.prompts]);
  const [answers, setAnswers] = useState<Record<string, string>>(empty);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setAnswers({ ...empty, ...JSON.parse(saved) });
    } catch {
      setStatus(zh ? '無法讀取先前儲存的內容。' : 'Saved content could not be loaded.');
    }
    setReady(true);
  }, [empty, storageKey, zh]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(answers));
    } catch {
      setStatus(zh ? '這個瀏覽器目前無法儲存內容。' : 'This browser cannot save your entries right now.');
    }
  }, [answers, ready, storageKey, zh]);

  function update(id: string, value: string) {
    setAnswers((current) => ({ ...current, [id]: value }));
    setStatus(zh ? '已儲存在這個瀏覽器' : 'Saved in this browser');
  }

  async function copySummary() {
    const summary = [tool.title, ...tool.prompts.map((prompt) => `${prompt.label}\n${answers[prompt.id] || ''}`)].join('\n\n');
    try {
      await navigator.clipboard.writeText(summary);
      setStatus(zh ? '已複製整理結果' : 'Worksheet copied');
    } catch {
      setStatus(zh ? '無法自動複製，請改用列印功能。' : 'Copy was unavailable. Try the print option instead.');
    }
  }

  function clearWorksheet() {
    if (!window.confirm(zh ? '要清除這份工作表的所有內容嗎？' : 'Clear every entry in this worksheet?')) return;
    setAnswers(empty);
    window.localStorage.removeItem(storageKey);
    setStatus(zh ? '工作表已清除' : 'Worksheet cleared');
  }

  return (
    <div className="rounded-[1.5rem] border border-[#173d2f]/10 bg-white p-6 shadow-[0_18px_48px_rgba(28,55,44,.09)] sm:p-10">
      <div className="flex flex-col gap-5 border-b border-[#173d2f]/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-[#2b6a53]">{zh ? '私人工作區' : 'PRIVATE WORKSPACE'}</p>
          <h2 className="mt-3 text-2xl font-medium tracking-[-.025em] text-[#10251d]">{zh ? '依照真實情境逐步整理' : 'Work through the real situation'}</h2>
          <p className="mt-2 max-w-2xl leading-7 text-[#53675f]">{zh ? '內容會自動儲存在這個瀏覽器。請避免輸入不必要的敏感資料。' : 'Entries save automatically in this browser. Avoid unnecessary sensitive information.'}</p>
        </div>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#27634e]"><CheckCircle className="h-5 w-5" />{status || (zh ? '尚未輸入' : 'Ready')}</span>
      </div>

      <div className="mt-8 grid gap-7">
        {tool.prompts.map((prompt, index) => (
          <div key={prompt.id} className="grid gap-3 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:gap-10">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] text-[#b06d31]">{String(index + 1).padStart(2, '0')}</p>
              <label htmlFor={prompt.id} className="mt-2 block text-lg font-semibold text-[#173d2f]">{prompt.label}</label>
              <p className="mt-2 text-sm leading-6 text-[#62736c]">{prompt.help}</p>
            </div>
            <textarea
              id={prompt.id}
              value={answers[prompt.id] || ''}
              onChange={(event) => update(prompt.id, event.target.value)}
              placeholder={prompt.placeholder}
              className="min-h-36 w-full resize-y rounded-[1rem] border border-[#173d2f]/15 bg-[#fbfcfa] px-4 py-3 leading-7 text-[#10251d] shadow-inner outline-none transition placeholder:text-[#7b8b84] focus:border-[#27634e] focus:ring-2 focus:ring-[#27634e]/15"
            />
          </div>
        ))}
      </div>

      <div className="mt-9 flex flex-wrap gap-3 border-t border-[#173d2f]/10 pt-7 print:hidden">
        <button type="button" onClick={copySummary} className="ssg-primary-button"><ClipboardText className="mr-2 h-5 w-5" />{zh ? '複製整理結果' : 'Copy worksheet'}</button>
        <button type="button" onClick={() => window.print()} className="inline-flex items-center rounded-full border border-[#27634e]/30 px-5 py-3 font-semibold text-[#27634e] hover:bg-[#edf2ee]"><Printer className="mr-2 h-5 w-5" />{zh ? '列印或存成 PDF' : 'Print or save PDF'}</button>
        <button type="button" onClick={clearWorksheet} className="inline-flex items-center rounded-full px-5 py-3 font-semibold text-[#7a4930] hover:bg-[#f6eee7]"><Trash className="mr-2 h-5 w-5" />{zh ? '清除工作表' : 'Clear worksheet'}</button>
      </div>
    </div>
  );
}
