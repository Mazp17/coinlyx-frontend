import { Eye } from "lucide-react";
import Header from "./components/layout/header";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "./components/ui/input";

import { useState } from "react";
import HistorialTransactions from "./components/HistorialTransactions";

const formSchema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function App() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openSheet = () => setIsSheetOpen(true);

  return (
    <div className="flex flex-col items-center min-h-screen bg-background/70 w-full ">
      <Header />
      <main className="w-[80%] mt-3">
        <HistorialTransactions isSheetOpen={isSheetOpen} setIsSheetOpen={setIsSheetOpen} ></HistorialTransactions>
        <header className="w-full inline-flex justify-between">
          <h1 className="text-lg font-semibold">Users</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"default"}>Add User</Button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Create an user</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="inline-flex gap-2 w-full justify-between">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jhon" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>your email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="admin@coinlyx.com"
                            {...field}
                          />
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
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Confirm your password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full mt-2" type="submit">
                    Submit
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </header>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Ana Garcia</TableCell>
              <TableCell>
                <Badge variant={"default"}>Active</Badge>
              </TableCell>
              <TableCell>$100,000.00</TableCell>
              <TableCell className="inline-flex gap-1">
                <Button onClick={openSheet} size={"sm"} variant={"ghost"}>
                  <Eye />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Ana Garcia</TableCell>
              <TableCell>
                <Badge variant={"secondary"}>Unactive</Badge>
              </TableCell>
              <TableCell>$100,000.00</TableCell>
              <TableCell className="inline-flex gap-1">
                <Button onClick={openSheet} size={"sm"} variant={"ghost"}>
                  <Eye />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </main>
    </div>
  );
}

export default App;
