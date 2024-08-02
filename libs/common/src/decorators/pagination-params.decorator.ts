import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/**
 * Interface designed to assign default parameters to pagination
 */
export interface DefaultPagination {
  defaultSkip?: number;
  defaultPage?: number;
  defaultLimit?: number;
  defaultOrder?: any;
  defaultOrderDirection?: string;
  defaultSearch?: any;
  defaultSearchValue: string;
  maxAllowedSize?: number;
}
/**
 * Decorator intended for building a PaginationRequest object based on the query string parameters
 */
export const PaginationParams = createParamDecorator(
  (
    data: DefaultPagination = {
      defaultSkip: 0,
      defaultPage: 0,
      defaultLimit: 10,
      defaultOrder: {},
      defaultOrderDirection: 'ASC',
      defaultSearch: {},
      defaultSearchValue: '',
      maxAllowedSize: 50,
    },
    ctx: ExecutionContext,
  ) => {
    const {
      query: { orderBy, orderDirection, searchBy, searchValue, ...params },
    } = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line prefer-const
    let { skip, page, limit, ...leftParams } = params;

    const {
      defaultSkip,
      defaultPage,
      defaultLimit,
      defaultOrder,
      defaultOrderDirection,
      maxAllowedSize,
      defaultSearch,
      defaultSearchValue,
    } = data;

    const order = orderBy ? { [orderBy]: orderDirection ? orderDirection : defaultOrderDirection } : defaultOrder;

    const search = searchBy ? { [searchBy]: searchValue ? searchValue : defaultSearchValue } : defaultSearch;

    limit = limit && limit >= 0 ? +limit : defaultLimit;

    if (!skip) {
      if (page) {
        skip = (+page - 1) * +limit;
        skip = skip >= 0 ? skip : 0;
      } else {
        page = defaultPage;
        skip = defaultSkip;
      }
    } else {
      page = Math.floor(+skip / limit);
    }

    limit = +limit < +maxAllowedSize ? limit : maxAllowedSize;
    return Object.assign(data ? data : {}, {
      skip,
      page,
      limit,
      order,
      search,
      params: leftParams,
    });
  },
);
