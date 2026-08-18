import { startCheckout } from "@/app/(marketing)/package/actions";
import { Button } from "@/components/ui/button";

type CheckoutButtonProps = {
  disabled?: boolean;
};

export function CheckoutButton({ disabled = false }: CheckoutButtonProps) {
  return (
    <form action={startCheckout} className="w-full">
      <Button type="submit" size="lg" className="w-full" disabled={disabled}>
        Get Started
      </Button>
    </form>
  );
}
