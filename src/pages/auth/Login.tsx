import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required();

const Login = () => {
  const { handleLogin, loading, isAuth } = useContext(AuthContext);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  if (loading) return <div>Loading...</div>;

  if (isAuth) return <Navigate to="/" />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background/70 w-full ">
      <div className="max-w-[21em] w-[90%] p-4 flex flex-col gap-4 bg-muted/20 border rounded-md">
        <div className="space-y-1">
          <span className="text-sm text-muted-foreground">Coinlyx</span>
          <h1 className="text-2xl font-bold">Login</h1>
        </div>
        <FormProvider {...form}>
          {/* @ts-expect-error este error se debe a que no combinan ambos oeperadores */}
          <form className="space-y-4" onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>E-Mail</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jhon@doe.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
