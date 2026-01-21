import { Link } from 'react-router-dom'
import {
  GitHubLogoIcon,
  TwitterLogoIcon,
  LinkedInLogoIcon,
  DiscordLogoIcon,
} from '@radix-ui/react-icons'

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center">
            <Link to="/" className="group flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                Shop.io
              </span>
            </Link>
          </div>

          <div className="order-3 text-sm font-medium text-slate-500 md:order-2">
            &copy; {new Date().getFullYear()} Todos los derechos reservados.
          </div>

          <div className="order-2 flex items-center gap-6 md:order-3">
            {[
              {
                Icon: GitHubLogoIcon,
                label: 'GitHub',
                href: 'https://github.com/francoqueirolo',
              },
              {
                Icon: TwitterLogoIcon,
                label: 'Twitter',
                href: 'https://twitter.com/francoqueirolo',
              },
              {
                Icon: LinkedInLogoIcon,
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/francoqueirolo/',
              },
              {
                Icon: DiscordLogoIcon,
                label: 'Discord',
                href: 'https://discord.com/users/fgqueirolo',
              },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:text-slate-900"
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
