export const formatNumberWithFraction = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
};

export const flattenContent = (list?: PageContent[]) => {
  if (!list) return [];
  return list.reduce<Content[]>((acc, cur) => {
    if (cur.content)
      return acc.concat(cur.content.filter((content) => !content.delete || content.id == null));
    return acc;
  }, []);
};

export const filterContentList = (contentList: PageContent<Content>[]) => {
  return contentList?.map((page) => ({
    ...page,
    content: page?.content?.filter((content) => !content.delete || content.id == null),
  }));
};

export const isArrayContainUndefined = (array: Array<any>) => {
  return array.some((x) => x === undefined);
};
