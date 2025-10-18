import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CheckEmailPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-cream p-6">
      <div className="w-full max-w-md">
        <Card className="border-charcoal/10">
          <CardHeader className="space-y-1">
            <CardTitle className="font-serif text-3xl text-charcoal">Check your email</CardTitle>
            <CardDescription className="text-charcoal/60">We've sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-charcoal/70">
              Please check your email and click the confirmation link to activate your account. Once confirmed, you can
              sign in and start creating posts.
            </p>
            <div className="mt-6 text-center">
              <Link href="/auth/login" className="text-sm text-amber hover:underline">
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
