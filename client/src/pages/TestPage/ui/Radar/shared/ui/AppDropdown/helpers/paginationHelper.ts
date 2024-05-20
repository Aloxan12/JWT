interface IPaginationHelper {
  next: string;
}

export const paginationHelper = ({
  next,
}: IPaginationHelper): { limit: number; offset: number } | {} => {
  const nextUrl = next ? new URL(next) : null;
  const nextLimit = nextUrl ? nextUrl.searchParams.get('limit') : null;
  const nextOffset = nextUrl ? nextUrl.searchParams.get('offset') : null;
  if (nextLimit && nextOffset) {
    return {
      limit: Number(nextLimit),
      offset: Number(nextOffset),
    };
  }
  return {};
};
