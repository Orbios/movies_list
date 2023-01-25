import {Pagination as BsPagination} from 'react-bootstrap';
import {range} from 'lodash';

const MAX_BUTTONS = 4;

interface Props {
  activePage: number;
  pageCount: number;
  onPageSelection: (page: number) => void;
}

function Pagination({activePage, pageCount, onPageSelection}: Props) {
  function getPageLimits(maxButtons: number, activePage: number, pageCount: number) {
    let startPage, endPage, hasHiddenPagesAfter;

    if (maxButtons) {
      const hiddenPagesBefore = activePage - parseInt((maxButtons / 2).toString(), 10);
      startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
      hasHiddenPagesAfter = startPage + maxButtons <= pageCount;

      if (!hasHiddenPagesAfter) {
        endPage = pageCount;
        startPage = pageCount - maxButtons + 1;
        if (startPage < 1) {
          startPage = 1;
        }
      } else {
        endPage = startPage + maxButtons - 1;
      }
    } else {
      startPage = 1;
      endPage = pageCount;
    }

    return {
      startPage,
      endPage,
      hasHiddenPagesAfter
    };
  }

  const pageLimits = getPageLimits(MAX_BUTTONS, activePage, pageCount);

  const hasHiddenPagesBefore = pageLimits.startPage !== 1;

  const pages = range(pageLimits.startPage, pageLimits.endPage + 1);

  const hasHiddenParts = pageLimits.hasHiddenPagesAfter || hasHiddenPagesBefore;

  const renderPageButton = (page: number) => {
    return (
      <BsPagination.Item key={page} active={page === activePage} onClick={() => onPageSelection(page)}>
        {page}
      </BsPagination.Item>
    );
  };

  return (
    <BsPagination>
      {hasHiddenParts && (
        <>
          <BsPagination.First disabled={activePage === 1} onClick={() => onPageSelection(1)} />
          <BsPagination.Prev disabled={activePage === 1} onClick={() => onPageSelection(activePage - 1)} />
        </>
      )}
      {hasHiddenPagesBefore && (
        <>
          {renderPageButton(1)}
          <BsPagination.Ellipsis />
        </>
      )}
      {pages.map(page => renderPageButton(page))}
      {pageLimits.hasHiddenPagesAfter && (
        <>
          <BsPagination.Ellipsis />
          {renderPageButton(pageCount)}
        </>
      )}
      {hasHiddenParts && (
        <>
          <BsPagination.Next disabled={activePage >= pageCount} onClick={() => onPageSelection(activePage + 1)} />
          <BsPagination.Last disabled={activePage >= pageCount} onClick={() => onPageSelection(pageCount)} />
        </>
      )}
    </BsPagination>
  );
}

export default Pagination;
