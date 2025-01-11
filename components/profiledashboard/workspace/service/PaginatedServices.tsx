import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatedServicesProps {
  services: string[];
  itemsPerPage?: number;
  renderItem: (service: string, index: number) => React.ReactNode;
  EmptyState: React.ComponentType;
}

const PaginatedServices: React.FC<PaginatedServicesProps> = ({ 
  services, 
  itemsPerPage = 8,
  renderItem, 
  EmptyState 
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedServices, setPaginatedServices] = useState<string[]>([]);
  
  const totalPages = Math.ceil(services.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    setCurrentPage(1);
  }, [services]);

  useEffect(() => {
    const paginatedData = services.slice(startIndex, endIndex);
    setPaginatedServices(paginatedData);
  }, [services, currentPage, startIndex, endIndex]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (services.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedServices.map((service, index) => renderItem(service, index))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-purple-600 border-purple-100 hover:bg-purple-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Button
              key={pageNum}
              variant={pageNum === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(pageNum)}
              className={`w-8 h-8 ${
                pageNum === currentPage
                  ? "bg-purple-500 text-white"
                  : "text-purple-600 border-purple-100 hover:bg-purple-50"
              }`}
            >
              {pageNum}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-purple-600 border-purple-100 hover:bg-purple-50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaginatedServices;
