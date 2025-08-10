
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Send, Mail, User, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type FormValues = z.infer<typeof formSchema>;

const PixelContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    
    try {
      // Replace with your own EmailJS service ID, template ID, and public key
      const result = await emailjs.sendForm(
        'gmail_service', // Replace with your EmailJS Service ID
        'template_t5bv425', // Replace with your EmailJS Template ID 
        formRef.current,
        'pskSZb9RCxjsfHwzo' // Replace with your EmailJS Public Key
      );
      
      console.log('Email sent successfully:', result.text);
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon!",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      console.error('Failed to send email:', error);
      
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 font-pixel text-white">
                  <User size={16} className="text-pixel-pink" />
                  Name
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your name" 
                    {...field} 
                    className="font-mono bg-pixel-black border-pixel-purple focus:border-pixel-pink" 
                    onKeyDown={(e) => {
                      if (e.key === ' ') {
                        e.stopPropagation();
                    }
                    }}
                  />
                </FormControl>
                <FormMessage className="text-pixel-pink" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 font-pixel text-white">
                  <Mail size={16} className="text-pixel-pink" />
                  Email
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="your.email@example.com" 
                    {...field} 
                    className="font-mono bg-pixel-black border-pixel-purple focus:border-pixel-pink" 
                  />
                </FormControl>
                <FormMessage className="text-pixel-pink" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 font-pixel text-white">
                  <MessageSquare size={16} className="text-pixel-pink" />
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Type your message here..." 
                    {...field} 
                    className="font-mono bg-pixel-black border-pixel-purple focus:border-pixel-pink min-h-[120px]" 
                    onKeyDown={(e) => {
                        if (e.key === ' ') {
                          e.stopPropagation();
                    }
                    }}
                  />
                </FormControl>
                <FormMessage className="text-pixel-pink" />
              </FormItem>
            )}
          />
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="pixel-btn w-full flex items-center justify-center gap-2 disabled:opacity-70"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isSubmitting ? (
              <>Processing...</>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </motion.button>
        </form>
      </Form>
    </>
  );
};

export default PixelContactForm;
