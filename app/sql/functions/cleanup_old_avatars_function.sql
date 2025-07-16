DROP FUNCTION IF EXISTS cleanup_old_avatars;

create or replace function cleanup_old_avatars()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  old_file record;
  bucket_name text := 'avatars';
begin
  -- 각 사용자별로 가장 최근 파일을 제외한 모든 파일을 삭제
  for old_file in
    select 
      storage.objects.name,
      storage.objects.owner,
      storage.objects.bucket_id
    from storage.objects
    where storage.objects.bucket_id = bucket_name
    and storage.objects.name like '%/%'  -- 폴더 구조 확인
    and storage.objects.name not in (
      -- 각 사용자별로 가장 최근 파일만 유지
      select distinct on (split_part(name, '/', 1)) name
      from storage.objects
      where bucket_id = bucket_name
      and name like '%/%'
      order by split_part(name, '/', 1), 
               cast(split_part(name, '/', 2) as bigint) desc
    )
  loop
    -- 파일 삭제
    delete from storage.objects 
    where bucket_id = old_file.bucket_id 
    and name = old_file.name;
  end loop;
end;
$$;
