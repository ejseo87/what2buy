drop function if exists public.handle_new_user() cascade;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    if new.raw_app_meta_data is not null then
        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'email' then
            if new.raw_user_meta_data ? 'name' and new.raw_user_meta_data ? 'username' then
                insert into public.profiles (profile_id, name, username)
                values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'username');
            else
                insert into public.profiles (profile_id, name, username)
                values (new.id, 'Anonymous', 'mr.' || substr(md5(random()::text), 1, 8));
            end if;
        end if;
        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'github' then
            insert into public.profiles (profile_id, name, username, avatar)
            values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'username'||substr(md5(random()::text), 1, 5), new.raw_user_meta_data ->> 'avatar_url');
        end if;
        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'kakao' then
            insert into public.profiles (profile_id, name, username, avatar)
            values (new.id, new.raw_user_meta_data ->> 'name', replace(new.raw_user_meta_data ->> 'preferred_username'||substr(md5(random()::text), 1, 5), ' ', ''), new.raw_user_meta_data ->> 'avatar_url');
        end if;
    end if;
    return new;
end;
$$;

create trigger user_to_profile_trigger
after insert on auth.users
for each row execute function public.handle_new_user();