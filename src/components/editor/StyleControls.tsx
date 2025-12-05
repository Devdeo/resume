'use client';

import React from 'react';
import { useResume } from '@/hooks/useResume';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { googleFonts } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function StyleControls() {
  const { style, setStyle } = useResume();
  const { toast } = useToast();
  const [customFonts, setCustomFonts] = React.useState<string[]>([]);

  const handleStyleChange = (name: string) => (value: string) => {
    setStyle(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string) => (value: number[]) => {
    setStyle(prev => ({ ...prev, [name]: String(value[0]) }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStyle(prev => ({ ...prev, accentColor: e.target.value }));
  };
  
  const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['.ttf', '.otf', '.woff', '.woff2'].some(ext => file.name.endsWith(ext))) {
        toast({
            title: "Invalid Font File",
            description: "Please upload a .ttf, .otf, .woff, or .woff2 file.",
            variant: "destructive"
        });
        return;
    }

    const fontName = file.name.split('.').slice(0, -1).join('.');
    const fontUrl = URL.createObjectURL(file);

    try {
        const fontFace = new FontFace(fontName, `url(${fontUrl})`);
        await fontFace.load();
        document.fonts.add(fontFace);
        setCustomFonts(prev => [...prev, fontName]);
        setStyle(prev => ({ ...prev, fontFamily: fontName }));
        toast({
            title: "Font Uploaded",
            description: `${fontName} is now available and has been applied.`
        });
    } catch (error) {
        console.error("Font loading failed:", error);
        toast({
            title: "Font Load Error",
            description: "Could not load the custom font.",
            variant: "destructive"
        });
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold font-headline mb-4">Typography</h3>
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Font Family</Label>
                <Select value={style.fontFamily} onValueChange={handleStyleChange('fontFamily')}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {customFonts.length > 0 && (
                          <SelectGroup>
                              <SelectLabel>Custom Fonts</SelectLabel>
                              {customFonts.map(font => <SelectItem key={font} value={font}>{font}</SelectItem>)}
                          </SelectGroup>
                        )}
                        <SelectGroup>
                            <SelectLabel>Google Fonts</SelectLabel>
                            {googleFonts.map(font => <SelectItem key={font} value={font}>{font}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label>Upload Custom Font (.ttf, .otf)</Label>
                <Input type="file" onChange={handleFontUpload} accept=".ttf,.otf,.woff,.woff2"/>
            </div>
            <div className="space-y-2">
                <Label>Font Size ({style.fontSize}pt)</Label>
                <Slider min={8} max={16} step={0.5} value={[parseFloat(style.fontSize)]} onValueChange={handleSliderChange('fontSize')} />
            </div>
        </div>
      </div>

       <div>
        <h3 className="text-lg font-semibold font-headline mb-4">Colors & Layout</h3>
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="flex items-center gap-2">
                    <Input type="color" value={style.accentColor} onChange={handleColorChange} className="p-1 h-10 w-14"/>
                    <Input type="text" value={style.accentColor} onChange={handleColorChange} />
                </div>
            </div>
             <div className="space-y-2">
                <Label>Page Margins ({style.pageMargins}mm)</Label>
                <Slider min={10} max={30} step={1} value={[parseInt(style.pageMargins)]} onValueChange={handleSliderChange('pageMargins')} />
            </div>
             <div className="space-y-2">
                <Label>Section Spacing ({style.sectionSpacing}px)</Label>
                <Slider min={10} max={40} step={2} value={[parseInt(style.sectionSpacing)]} onValueChange={handleSliderChange('sectionSpacing')} />
            </div>
        </div>
      </div>
    </div>
  );
}
