"use client";

export const CartFooter = () => {
  return (
    <footer className="flex flex-col gap-6">
      <section className="flex flex-col items-center">
        <div className="font-medium flex justify-between w-full">
          <p>Subtotal</p>
          <p className="text-sm">$299.00</p>
        </div>

        <div className="font-medium flex justify-between w-full">
          <p>Gastos de envio</p>
          <p className="text-black/50 text-sm">Calculado en checkout</p>
        </div>

        <div className="font-medium flex justify-between w-full">
          <p>
            Total <span className="text-black/50 text-sm">(IVA incluido)</span>
          </p>
          <p className="text-sm">MXN 900.00</p>
        </div>
      </section>
      <button className="btn bg-novi-400 text-white text-[16px] font-medium hover:bg-novi-400 hover:bg-opacity-90">
        <p className="uppercase">Tramitar pedido</p>
      </button>
    </footer>
  );
};
