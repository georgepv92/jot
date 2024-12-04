'use client'

import { Pencil, ClipboardList, Calendar, BarChart2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface NavButtonProps {
  href: string
  icon: React.ElementType
  label: string
  isActive?: boolean
  onClick?: () => void
}

export function NavBar() {
  const [activeTab, setActiveTab] = useState('jot')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center space-x-2" onClick={() => setActiveTab('jot')}>
          <Pencil className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
          <span className="text-xl sm:text-2xl font-montserrat font-semibold italic text-black">Jot</span>
        </Link>
        <button className="md:hidden text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="hidden md:flex items-center space-x-8">
          <NavButton href="/plan" icon={ClipboardList} label="Plan" isActive={activeTab === 'plan'} onClick={() => setActiveTab('plan')} />
          <NavButton href="/track" icon={Calendar} label="Track" isActive={activeTab === 'track'} onClick={() => setActiveTab('track')} />
          <NavButton href="/analyze" icon={BarChart2} label="Analyze" isActive={activeTab === 'analyze'} onClick={() => setActiveTab('analyze')} />
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="absolute top-16 right-0 w-36 bg-white shadow-md rounded-lg md:hidden">
          <div className="py-2">
            <NavButton href="/plan" icon={ClipboardList} label="Plan" isActive={activeTab === 'plan'} onClick={() => { setActiveTab('plan'); setMobileMenuOpen(false); }} />
            <NavButton href="/track" icon={Calendar} label="Track" isActive={activeTab === 'track'} onClick={() => { setActiveTab('track'); setMobileMenuOpen(false); }} />
            <NavButton href="/analyze" icon={BarChart2} label="Analyze" isActive={activeTab === 'analyze'} onClick={() => { setActiveTab('analyze'); setMobileMenuOpen(false); }} />
          </div>
        </div>
      )}
    </nav>
  )
}

function NavButton({ href, icon: Icon, label, isActive, onClick }: NavButtonProps) {
  return (
    <Link 
      href={href} 
      className={`flex items-center px-3 py-2 ${
        isActive ? 'text-black' : 'text-gray-600'
      } transition-colors duration-200`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
      <span className="text-sm font-montserrat font-medium italic">{label}</span>
    </Link>
  )
}

