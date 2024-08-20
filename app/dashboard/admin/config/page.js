// File: /app/dashboard/admin/config/page.js

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";

export default function ConfigDashboard() {
  const [config, setConfig] = useState({
    appName: "",
    appDescription: "",
    domainName: "",
    crisp: { id: "", onlyShowOnRoutes: [] },
    stripe: { 
      offerSubscription: false,
      plans: []
    },
    colors: { theme: "", main: "" },
    auth: { loginUrl: "", callbackUrl: "" }
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/dashboard/config');
      const data = await response.json();
      setConfig(JSON.parse(data.content));
    } catch (error) {
      console.error('Failed to fetch config:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/dashboard/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: JSON.stringify(config, null, 2) }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'Config updated successfully' });
      } else {
        setStatus({ type: 'error', message: 'Failed to update config' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred while saving' });
    }
  };

  const handleChange = (section, key, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Config Dashboard</h1>
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="stripe">Stripe</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="appName">App Name</Label>
                <Input
                  id="appName"
                  value={config.appName}
                  onChange={(e) => handleChange('general', 'appName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appDescription">App Description</Label>
                <Input
                  id="appDescription"
                  value={config.appDescription}
                  onChange={(e) => handleChange('general', 'appDescription', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domainName">Domain Name</Label>
                <Input
                  id="domainName"
                  value={config.domainName}
                  onChange={(e) => handleChange('general', 'domainName', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="crispId">Crisp ID</Label>
                <Input
                  id="crispId"
                  value={config.crisp.id}
                  onChange={(e) => handleChange('crisp', 'id', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stripe">
          <Card>
            <CardHeader>
              <CardTitle>Stripe Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="offerSubscription"
                  checked={config.stripe.offerSubscription}
                  onChange={(e) => handleChange('stripe', 'offerSubscription', e.target.checked)}
                />
                <Label htmlFor="offerSubscription">Offer Subscription</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Input
                  id="theme"
                  value={config.colors.theme}
                  onChange={(e) => handleChange('colors', 'theme', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainColor">Main Color</Label>
                <Input
                  id="mainColor"
                  value={config.colors.main}
                  onChange={(e) => handleChange('colors', 'main', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Button onClick={handleSave} className="mt-4">Save Config</Button>
      {status && (
        <Alert className={status.type === 'success' ? 'bg-green-100' : 'bg-red-100'}>
          {status.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          <AlertTitle>{status.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}