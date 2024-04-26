import React, { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function Pagination({ pageCount, onPageChange }) {
  const [active, setActive] = useState(1);

  const getItemProps = (index) => ({
    color: active === index ? "blue" : "gray", // Cambiar el color a azul si es la página activa
    onClick: () => {
      setActive(index);
      onPageChange({ selected: index - 1 });
    },
  });

  const next = () => {
    if (active === pageCount) return;
    setActive(active + 1);
    onPageChange({ selected: active });
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    onPageChange({ selected: active - 2 });
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full transition-all hover:bg-blue-500 hover:text-white hover:shadow-md"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Anterior
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: pageCount }, (_, index) => (
          <span key={index + 1} style={getItemProps(index + 1)}>
            {index + 1}
          </span>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full transition-all hover:bg-blue-500 hover:text-white hover:shadow-md"
        onClick={next}
        disabled={active === pageCount}
      >
        Siguiente <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
export default Pagination;
