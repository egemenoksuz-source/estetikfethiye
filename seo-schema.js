(function () {
  const canonical = document.querySelector('link[rel="canonical"]')?.href || location.href;
  const title = document.querySelector('h1')?.textContent.trim() || document.title;
  const description = document.querySelector('meta[name="description"]')?.content || '';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage', '@id': canonical + '#webpage', url: canonical,
        name: document.title, description,
        inLanguage: document.documentElement.lang || 'tr',
        isPartOf: { '@id': 'https://estetikfethiye.com/#website' },
        about: { '@type': 'MedicalProcedure', name: title }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Estetik Fethiye', item: 'https://estetikfethiye.com/' },
          { '@type': 'ListItem', position: 2, name: title, item: canonical }
        ]
      }
    ]
  };
  const questions = Array.from(document.querySelectorAll('.faq details')).map((detail) => ({
    '@type': 'Question',
    name: detail.querySelector('summary')?.textContent.trim() || '',
    acceptedAnswer: {
      '@type': 'Answer',
      text: detail.querySelector('p')?.textContent.trim() || ''
    }
  })).filter((item) => item.name && item.acceptedAnswer.text);
  if (questions.length) {
    schema['@graph'].push({
      '@type': 'FAQPage',
      '@id': canonical + '#faq',
      mainEntity: questions
    });
  }
  const node = document.createElement('script');
  node.type = 'application/ld+json';
  node.textContent = JSON.stringify(schema);
  document.head.appendChild(node);
})();
