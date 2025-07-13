drop function if exists public.handle_freetickets_for_new_user() cascade;
drop trigger if exists freetickets_for_new_user_trigger on public.profiles;

CREATE OR REPLACE FUNCTION public.handle_freetickets_for_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.tickets ( ticket_type, ticket_duration_start, ticket_duration_end, status, profile_id)
    VALUES 
        ( 'free', CURRENT_DATE, CURRENT_DATE + INTERVAL '1 month', 'not_used', NEW.profile_id),
        ('free', CURRENT_DATE, CURRENT_DATE + INTERVAL '1 month', 'not_used', NEW.profile_id),
        ( 'free', CURRENT_DATE, CURRENT_DATE + INTERVAL '1 month', 'not_used', NEW.profile_id);
    RETURN NEW;
END;
$$;

CREATE TRIGGER freetickets_for_new_user_trigger
AFTER INSERT ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.handle_freetickets_for_new_user();

