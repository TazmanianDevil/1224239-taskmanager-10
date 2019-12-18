const getHashTagTemplate = (hashtag) => {
  return (
    `<span class="card__hashtag-inner">
            <span class="card__hashtag-name">
              #${hashtag}
            </span>
          </span>`
  );
};

export const getHashTagTemplates = (hashtags) => {
  return hashtags
    .map((hashtag) => {
      return getHashTagTemplate(hashtag);
    })
    .join(`\n`);
};
