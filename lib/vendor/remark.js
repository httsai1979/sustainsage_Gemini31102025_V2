function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return char;
    }
  });
}

function renderMarkdown(markdown = '') {
  const lines = markdown.split(/\r?\n/);
  const parts = [];
  let inList = false;

  const closeListIfNeeded = () => {
    if (inList) {
      parts.push('</ul>');
      inList = false;
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (line.length === 0) {
      closeListIfNeeded();
      return;
    }

    if (/^#{1,6}\s+/.test(line)) {
      closeListIfNeeded();
      const level = line.match(/^#+/)[0].length;
      const heading = escapeHtml(line.replace(/^#{1,6}\s+/, ''));
      parts.push(`<h${level}>${heading}</h${level}>`);
      return;
    }

    if (line.startsWith('- ')) {
      if (!inList) {
        parts.push('<ul>');
        inList = true;
      }
      const item = escapeHtml(line.slice(2).trim());
      parts.push(`<li>${item}</li>`);
      return;
    }

    closeListIfNeeded();
    parts.push(`<p>${escapeHtml(line)}</p>`);
  });

  closeListIfNeeded();

  return parts.join('');
}

class RemarkProcessor {
  constructor() {
    this.plugins = [];
  }

  use(plugin) {
    if (plugin) {
      this.plugins.push(plugin);
    }
    return this;
  }

  async process(markdown) {
    const html = renderMarkdown(markdown);
    return {
      toString() {
        return html;
      },
    };
  }
}

export function remark() {
  return new RemarkProcessor();
}
