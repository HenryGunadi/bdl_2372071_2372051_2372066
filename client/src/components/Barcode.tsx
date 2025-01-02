import { useBarcode } from "@createnextapp/react-barcode";

function Barcode({ value }: { value?: string }) {
  const { inputRef } = useBarcode({
    value: "createnextapp",
    options: {},
  });

  return <svg ref={inputRef} />;
}

export default Barcode;
