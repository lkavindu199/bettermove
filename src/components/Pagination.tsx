import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  baseUrl,
  className = '',
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`${className}`}>
      <ul className="pagination">
        <li>
          <Link 
            href={`${baseUrl}?page=${Math.max(1, currentPage - 1)}`}
            aria-disabled={currentPage === 1}
          >
            <i className="fa-solid fa-arrow-left-long"></i>
          </Link>
        </li>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page} className={currentPage === page ? 'active' : ''}>
            <Link href={`${baseUrl}?page=${page}`}>
              {page}
            </Link>
          </li>
        ))}
        
        <li>
          <Link 
            href={`${baseUrl}?page=${Math.min(totalPages, currentPage + 1)}`}
            aria-disabled={currentPage === totalPages}
          >
            <i className="fa-solid fa-arrow-right-long"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};