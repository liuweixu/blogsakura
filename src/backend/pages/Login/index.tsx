import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export function Login() {
  const form = useForm();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((fromValue) => {
          console.log(fromValue);
        })}
      >
        <Card className="w-[350px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_50px_rgba(0,0,0,0.2)]">
          <CardHeader>
            <CardTitle>登录</CardTitle>
            <CardDescription>请输入手机号和验证码</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">手机号</Label>
                  <Input
                    id="phone"
                    placeholder="请输入您的手机号"
                    {...form.register("phone")}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="code">验证码</Label>
                  <Input
                    id="code"
                    placeholder="请输入验证码"
                    maxLength={6}
                    {...form.register("code")}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">确认</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
